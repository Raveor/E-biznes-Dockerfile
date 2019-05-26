package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class BookRepository @Inject()(val dbConfigProvider: DatabaseConfigProvider, val authorRepository: AuthorRepository,
                               val publishingHouseRepository: PublishingHouseRepository)(implicit ec: ExecutionContext) {
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

    def author_fk = foreignKey("ct_t_books_author_fk", author, authorTable)(_.id)
    def publishing_house_fk = foreignKey("ct_t_books_publishing_house_fk", publishingHouse, publishingHouseTable)(_.id)

    def * = (id, title, author, publishingHouse, publishYear, description, price) <> ((Book.apply _).tupled, Book.unapply)
  }
  import authorRepository.AuthorTable
  import publishingHouseRepository.PublishingHouseTable

  val authorTable = TableQuery[AuthorTable]
  val publishingHouseTable = TableQuery[PublishingHouseTable]

  private val book = TableQuery[BookTable]

  def list(): Future[Seq[Book]] = db.run {
    book.result
  }

  def getById(id: Int): Future[Seq[Book]] = db.run {
    book
      .filter(_.id === id)
      .result
  }

}
