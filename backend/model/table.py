from sqlalchemy import create_engine, Column, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base


Base = declarative_base()

class ArticleListModel(Base):
    __tablename__ = "articleList"

    id: Column(String, primary_key=True)
    title: Column(String)
    excerpt: Column(String)
    tag: Column(String)
    date: Column(String)
    readTime: Column(int)
    views: Column(int)

engine = create_engine('sqlite:///database.db')

DBSession = sessionmaker(bind=engine)