from fastapi import APIRouter, HTTPException
import pymysql
from database import get_db_connection
from models import Student, UserInfo

# 避免与fastapi库命名冲突
router = APIRouter()

# 注册
@router.post("/register/", tags=["login_register"])
def register(student: Student):
    conn = get_db_connection()
    cursor = conn.cursor()
    # 查询是否已存在账号
    cursor.execute("SELECT account FROM students WHERE account = %s", (student.account,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Account already registered")
    try:
        cursor.execute("INSERT INTO students (name, age, position, awards, account, pwd, department, periodNum) VALUES (%s, %s, %s, %s, %s, %d, %s, %s)",
                    (student.name, student.age, student.position, student.awards, student.account, student.pwd, student.department, student.periodNum))
    except pymysql.MySQLError as e:
        raise HTTPException(status_code=500, detail="Input information format error.")
    cursor.close()
    conn.close()
    return {"message": "Student registered successfully"}

@router.post("/login/", tags=["login_register"])
def login(info: UserInfo):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT pwd FROM students WHERE account = %s", (info.account,))
    student_pwd = cursor.fetchone()
    if student_pwd is None:
        raise HTTPException(status_code=404, detail="Account not found")
    if student_pwd[0] != info.pwd:
        raise HTTPException(status_code=401, detail="Incorrect password")
    cursor.close()
    conn.close()
    return {"message": "Login successful"}