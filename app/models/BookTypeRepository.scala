package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class BookTypeRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class BookTypeTable(tag: Tag) extends Table[BookType](tag, "t_book_types") {
    def id = column[Int]("book_type_id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("type_name")

    def * = (id, name) <> ((BookType.apply _).tupled, BookType.unapply)

  }

  val bookTypeTable = TableQuery[BookTypeTable]

  def list(): Future[Seq[BookType]] = db.run {
    bookTypeTable.result
  }

  def getById(id: Int): Future[Seq[BookType]] = db.run {
    bookTypeTable
      .filter(_.id === id)
      .result
  }

  def insert(name: String): Future[Int] = db.run {
    bookTypeTable += BookType(0, name)
  }

  def edit(id: Int, name: String): Future[Int] = db.run {
    val bookType = BookType(id, name)
    bookTypeTable.filter(_.id === id).update(bookType)
  }

  def delete(id: Int): Future[Int] = db.run {
    bookTypeTable.filter(_.id === id).delete
  }

}
