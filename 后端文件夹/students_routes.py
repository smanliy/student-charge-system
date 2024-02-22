from fastapi import APIRouter, HTTPException
from models import Student, UserInfo
import pymysql
from database import get_db_connection
from typing import List

router = APIRouter()

# 获取所有学生信息
@router.get("/students/", response_model=List[Student], tags=["Students"])
def read_students():
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM students")
    students = cursor.fetchall()
    cursor.close()
    conn.close()
    return students

# 获取单个学生信息
@router.get("/students/{student_account}", response_model=Student, tags=["Students"])
def read_student(student_account: int):
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM students WHERE account = %s", (student_account,))
    student = cursor.fetchone()
    cursor.close()
    conn.close()
    if student is None:  # 如果未找到学生，返回404错误
        raise HTTPException(status_code=404, detail="Student not found")
    return student

# 向数据库插入学生账号
@router.post("/students/", tags=["Students"])
def Insert_student(student: Student):
    conn = get_db_connection()
    cursor = conn.cursor()
    # 查询是否已存在账号
    cursor.execute("SELECT account FROM students WHERE account = %s", (student.account,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Account already registered")
    try:
        cursor.execute("INSERT INTO students (name, position, awards, account, pwd, periodNum, department) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    (student.name, student.position, student.awards, student.account, student.pwd, student.periodNum, student.department))
    except pymysql.MySQLError as e:
        raise HTTPException(status_code=500, detail="Input information format error.")
    cursor.close()
    conn.close()
    return {"message": "Student added successfully"}

# 更新学生信息
@router.put("/students/{student_account}", tags=["Students"], summary="更新学生信息 路径参数中的账号与请求体中输入的账号必须一致, 否则返回500报错")
def update_student(student_account: int, student: Student):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE students SET name = %s, position = %s, awards = %s, pwd = %s, department = %s, periodNum = %s WHERE account = %s",
                   (student.name, student.position, student.awards, student.pwd, student.department, student.periodNum, student_account))
    updated = cursor.rowcount
    cursor.close()
    conn.close()
    if updated == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student updated successfully"}

# 修改密码
@router.put("/students/changepwd/", tags=["Students"], summary="修改密码 请求体输入账号和新的密码，将账号对应用户密码改成新输入的密码")
def update_pwd(info: UserInfo):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE students SET pwd = %s WHERE account = %s",
                   (info.pwd, info.account))
    updated = cursor.rowcount
    cursor.close()
    conn.close()
    if updated == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student updated successfully"}

# 重置密码
@router.put("/students/changepwd/{student_account}", tags=["Students"], summary="重置密码 查询参数为需要重置密码的账号, 将对应账号的密码改成123456")
def reset_pwd(student_account: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE students SET pwd = %s WHERE account = %s",
                   (123456, student_account))
    updated = cursor.rowcount
    cursor.close()
    conn.close()
    if updated == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student updated successfully"}

# 删除学生信息
@router.delete("/students/{student_account}", tags=["Students"])
def delete_student(student_account: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM students WHERE account = %s", (student_account,))
    deleted = cursor.rowcount
    cursor.close()
    conn.close()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student deleted successfully"}