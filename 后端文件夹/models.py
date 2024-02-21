from pydantic import BaseModel
from typing import Optional
from enum import Enum

class PeriodNum(str, Enum):
    admin = "管理员"
    six = "六期"
    seven = "七期"
    eight = "八期"

class Department(str, Enum):
    data_science = "数据科学"
    Full_stack = "全栈"
    CPU_OS = "CPU&OS"
    JAVA = "JAVA"

class Student(BaseModel):
    name: str
    age: Optional[int] = None
    position: Optional[str] = None
    awards: Optional[str] = None
    account: int
    pwd: int
    periodNum: PeriodNum
    department: Department

class AwardsInfo(BaseModel):
    account: int
    name: str
    experience: str = None
    date_awarded: str = None

class UpdateResponseModel(BaseModel):
    message: str
    position: str
    
class PositionUpdate(BaseModel):
    position: str

class AwardsInfo(BaseModel):
    account: int
    name: str
    awards: str = None
    experience: str = None

class UserInfo(BaseModel):
    account: int
    pwd: int