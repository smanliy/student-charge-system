from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class PeriodNum(str, Enum):
    six = "六期"
    seven = "七期"
    eight = "八期"
    admin = "管理员"

class Department(str, Enum):
    data_science = "数据科学"
    Full_stack = "全栈"
    CPU_OS = "CPU&OS"
    JAVA = "JAVA"
    devise = "设计"
    secretariat = "秘书处"

class Student(BaseModel):
    name: str
    position: Optional[str] = None
    awards: Optional[str] = "无"
    account: str
    pwd: str
    periodNum: PeriodNum
    department: Department

class AwardsInfo(BaseModel):
    account: str
    name: str
    awards: Optional[str] = None
    experience: Optional[str] = None

class UpdateResponseModel(BaseModel):
    message: str
    position: str
    
class PositionUpdate(BaseModel):
    position: str

class UserInfo(BaseModel):
    account: str
    pwd: str

class Student_AwardsInfo(BaseModel):
    student_Model: Student
    awardsInfo_Model: List[AwardsInfo]