package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class BookRepository @Inject()(val dbConfigProvider: DatabaseConfigProvider, val authorRepository: AuthorRepository,
                               val publishingHouseRepository: PublishingHouseRepository,
                               val bookTypeRepository: BookTypeRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._


  class BookTable(tag: Tag) extends Table[Book](tag, "t_books") {
    def id = column[Int]("book_id", O.PrimaryKey, O.AutoInc)

    def title = column[String]("title")

    def author = column[Int]("author_id")

    def publishingHouse = column[Int]("publishing_house_id")

    def publishYear = column[Int]("publish_year")

    def description = column[String]("description")

    def price = column[Float]("book_price")

    def bookType = column[Int]("book_type_id")

    def book_type_fk = foreignKey("ct_t_books_book_type_id_fk", bookType, bookTypeTable)(_.id)
    def author_fk = foreignKey("ct_t_books_author_fk", author, authorTable)(_.id)
    def publishing_house_fk = foreignKey("ct_t_books_publishing_house_fk", publishingHouse, publishingHouseTable)(_.id)

    def * = (id, title, author, publishingHouse, publishYear, description, price, bookType) <> ((Book.apply _).tupled, Book.unapply)
  }
  import authorRepository.AuthorTable
  import publishingHouseRepository.PublishingHouseTable
  import bookTypeRepository.BookTypeTable

  val authorTable = TableQuery[AuthorTable]
  val publishingHouseTable = TableQuery[PublishingHouseTable]
  val bookTypeTable = TableQuery[BookTypeTable]

  private val bookTable = TableQuery[BookTable]

  def list(): Future[Seq[Book]] = db.run {
    bookTable.result
  }

  def getById(id: Int): Future[Seq[Book]] = db.run {
    bookTable
      .filter(_.id === id)
      .result
  }

  def edit(id: Int, title: String, author:Int, publishingHouse: Int, publishYear: Int, description: String, price: Float, bookType : Int) : Future[Int] = db.run {
    bookTable.filter(_.id === id).update(Book(id, title, author, publishingHouse, publishYear, description, price, bookType))
  }

  def delete(id: Int) : Future[Int] = db.run {
    bookTable.filter(_.id === id).delete
  }

}
