import pymysql
from database_config import DB_CONFIG

def get_db_connection():
    return pymysql.connect(**DB_CONFIG)
