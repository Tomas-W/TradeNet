import json
import requests

from datetime import datetime
from flask import request
from typing import Dict, Any
from user_agents import parse


class TrackingContext:
    def __init__(self):
        pass

    def get_ip_address(self) -> str:
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            return forwarded_for.split(",")[0].strip()
        return request.remote_addr
    
    def _is_local_dev(self, ip_address: str) -> bool:
        return (ip_address == "127.0.0.1" or 
                ip_address == "localhost" or 
                ip_address.startswith(("192.168.", "10.")))
    
    def _request_geolocation(self, ip_address: str) -> Dict[str, str]:
        try:
            response = requests.get(
                f"http://ip-api.com/json/{ip_address}", 
                timeout=5
            )
            if response.status_code == 200:
                data = response.json()   
                if data.get("status") == "success":
                    return data
        
        except Exception:
            return None

    def get_geolocation(self, ip_address: str) -> Dict[str, str]:
        # Skip local dev
        if self._is_local_dev(ip_address):
            return {
                "country": "Local Network",
                "country_code": "LN",
                "city": "Local",
                "region": "Local",
                "isp": "N/A",
                "timezone": "N/A"
            }
        
        geolocation_data = self._request_geolocation(ip_address)
        if geolocation_data:
            return {
                "country": geolocation_data.get("country", "Unknown"),
                "country_code": geolocation_data.get("countryCode", "Unknown"),
                "city": geolocation_data.get("city", "Unknown"),
                "region": geolocation_data.get("regionName", "Unknown"),
                "isp": geolocation_data.get("isp", "Unknown"),
                "timezone": geolocation_data.get("timezone", "Unknown")
            }
        else:
            return {
                "country": "Unknown",
                "country_code": "Unknown",
                "city": "Unknown",
                "region": "Unknown",
                "isp": "Unknown",
                "timezone": "Unknown"
            }

    def get_device_info(self) -> Dict[str, Any]:
        user_agent_string = request.headers.get("User-Agent", "")
        user_agent = parse(user_agent_string)
        
        return {
            "browser": f"{user_agent.browser.family} {user_agent.browser.version_string}",
            "os": f"{user_agent.os.family} {user_agent.os.version_string}",
            "device": user_agent.device.family,
            "is_mobile": user_agent.is_mobile,
            "is_tablet": user_agent.is_tablet,
            "is_pc": user_agent.is_pc,
            "is_bot": user_agent.is_bot,
            "raw_user_agent": user_agent_string
        }


class UserTracker(TrackingContext):
    def __init__(self):
        self.tracking_memory = []
    
    def get_tracking_data(self) -> list:
        return self.tracking_memory
    
    def track_user(self) -> Dict[str, Any]:
        user_details = self.get_user_details()
        formatted_data = json.dumps(user_details, indent=4)
        print(formatted_data)
        self.save_user_details(user_details)
        return user_details
    
    def get_user_details(self) -> Dict[str, Any]:
        ip_address = self.get_ip_address()
        geo_data = self.get_geolocation(ip_address)
        device_info = self.get_device_info()
        
        return {
            "timestamp": datetime.now().strftime("%Y-%m-%d @ %H:%M:%S"),
            "ip_address": ip_address,
            "geo_data": geo_data,
            "device_info": device_info,
            "method": request.method,
            "referrer": request.referrer
        }
    
    def save_user_details(self, user_details: Dict[str, Any]) -> None:
        self.tracking_memory.append(user_details)
        
        # Keep memory usage limited
        if len(self.tracking_memory) > 200:
            self.tracking_memory = self.tracking_memory[100:]
