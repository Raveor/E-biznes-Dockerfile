package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class Book2TypesRepository @Inject()(val dbConfigProvider: DatabaseConfigProvider, val bookRepository: BookRepository,
                                     val bookTypeRepository: BookTypeRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._
  import bookRepository.BookTable
  import bookTypeRepository.BookTypeTable

  class Book2TypesTable(tag: Tag) extends Table[Book2Types](tag, "t_book2types") {
    def book_id = column[Int]("book_id", O.PrimaryKey)

    def type_id = column[Int]("book_type_id", O.PrimaryKey)

    def book_fk = foreignKey("ct_t_book2types_book_id_fk", book_id, bookTable)(_.id)
    def book_typ_fk = foreignKey("ct_t_book2types_book_type_id", type_id, bookTypeTable)(_.id)

    def * = (book_id, type_id) <> ((Book2Types.apply _).tupled, Book2Types.unapply)
  }

  val bookTable = TableQuery[BookTable]
  val bookTypeTable = TableQuery[BookTypeTable]

  val book2Types = TableQuery[Book2TypesTable]

  def list(): Future[Seq[Book2Types]] = db.run {
    book2Types.result
  }

  def getByIds(book_id: Int, type_id: Int): Future[Seq[Book2Types]] = db.run {
    book2Types
      .filter(_.book_id === book_id)
      .filter(_.type_id === type_id)
      .result
  }

}
