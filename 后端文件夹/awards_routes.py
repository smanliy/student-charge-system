from fastapi import APIRouter, HTTPException
from models import AwardsInfo
import pymysql
from database import get_db_connection
from typing import List

router = APIRouter()

#获取学生的获奖信息
@router.get("/awardsinfo/", response_model=List[AwardsInfo], tags=["awards"])
def read_student_awards():
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM awardsinfo")
    awards = cursor.fetchall()
    cursor.close()
    conn.close()
    return awards

#获取单个学生获奖信息
@router.get("/awardsinfo/{Awardsinfo_account}", response_model=AwardsInfo, tags=["awards"])
def read_student(AwardsInfo_account: int):
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM AwardsInfo WHERE account = %s", (AwardsInfo_account,))
    student = cursor.fetchone()
    cursor.close()
    conn.close()
    if student is None:
        raise HTTPException(status_code=404, detail="Student‘s awards not found")
# 如果未找到学生获奖信息，返回404错误

#添加获奖信息及经历
@router.post("/awardsinfo/", tags=["awards"])
def create_awards(Students_awards: AwardsInfo):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO students (account ,name, awards, experience) VALUES (%s, %s, %s, %s)",
                   (Students_awards.account,Students_awards.name, Students_awards.awards, Students_awards.experience))
    cursor.close()
    conn.close()
    return {"message": "Student's awards added successfully"}

#更新获奖信息
@router.put("/awardsinfo/{AwardsInfo_account}", tags=["awards"])
def update_awards(AwardsInfo_account: int, Students_awards: AwardsInfo):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE students SET name = %s, experience = %s, awards = %s WHERE account = %s",
                   (Students_awards.name, Students_awards.experience, Students_awards.awards, AwardsInfo_account))
    updated = cursor.rowcount
    cursor.close()
    conn.close()
    if updated == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student's awards updated successfully"}

#删除获奖经历
@router.delete("/awardsinfo/{AwardsInfo_account}", tags=["awards"])
def delete_awards(AwardsInfo_account: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM AwardsInfo WHERE account = %s", (AwardsInfo_account,))
    deleted = cursor.rowcount
    cursor.close()
    conn.close()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Student's awards not found")
    return {"message": "Student's awards deleted successfully"}