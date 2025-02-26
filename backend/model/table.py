#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

# 鍒涘缓瀵硅薄鐨勫熀绫�:
Base = declarative_base()


# 瀹氫箟User瀵硅薄:
class User(Base):
    # 琛ㄧ殑鍚嶅瓧:
    __tablename__ = "user"

    # 琛ㄧ殑缁撴瀯:
    id = Column(String(20), primary_key=True)
    name = Column(String(20))


# 鍒濆鍖栨暟鎹簱杩炴帴:
engine = create_engine("mysql+mysqlconnector://root:password@localhost:3306/test")
# 鍒涘缓DBSession绫诲瀷:
DBSession = sessionmaker(bind=engine)

# 鍒涘缓session瀵硅薄:
session = DBSession()
# 鍒涘缓鏂癠ser瀵硅薄:
new_user = User(id="5", name="Bob")
# 娣诲姞鍒皊ession:
session.add(new_user)
# 鎻愪氦鍗充繚瀛樺埌鏁版嵁搴�:
session.commit()
# 鍏抽棴session:
session.close()

# 鍒涘缓Session:
session = DBSession()
# 鍒涘缓Query鏌ヨ锛宖ilter鏄痺here鏉′欢锛屾渶鍚庤皟鐢╫ne()杩斿洖鍞竴琛岋紝濡傛灉璋冪敤all()鍒欒繑鍥炴墍鏈夎:
user = session.query(User).filter(User.id == "5").one()
# 鎵撳嵃绫诲瀷鍜屽璞＄殑name灞炴€�:
print("type:", type(user))
print("name:", user.name)
# 鍏抽棴Session:
session.close()