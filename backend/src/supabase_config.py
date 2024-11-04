import os,sys
from supabase import create_client, Client
from dataclasses import dataclass
from dotenv import load_dotenv
from src.utils.exception import customException
from src.utils.logger import logging

@dataclass
class Supabase_config:
    load_dotenv()
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")

class Supabase:
    def __init__(self):
        self.config=Supabase_config()
        self.supabase: Client = create_client(self.config.SUPABASE_URL, self.config.SUPABASE_KEY)
    
    def fetch_alert_data(self):
        response = self.supabase.table("hist").select("*").execute()
        return response

    def insert_alert_data(self,data):
        response = self.supabase.table("hist").insert(data).execute()
        return response

        
    