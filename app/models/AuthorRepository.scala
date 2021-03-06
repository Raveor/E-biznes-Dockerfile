package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class AuthorRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class AuthorTable(tag: Tag) extends Table[Author](tag, "t_authors") {
    def id = column[Int]("author_id", O.PrimaryKey, O.AutoInc)

    def surname = column[String]("surname")

    def name = column[String]("author_name")

    def * = (id, surname, name) <> ((Author.apply _).tupled, Author.unapply)
  }

  val authorTable = TableQuery[AuthorTable]

  def list(): Future[Seq[Author]] = db.run {
    authorTable.result
  }

  def getById(id: Int): Future[Seq[Author]] = db.run {
    authorTable
      .filter(_.id === id)
      .result
  }

  def insert(name: String, surname: String): Future[Int] = db.run {
    authorTable += Author(0, surname, name)
  }

  def edit(id: Int, name: String, surname: String): Future[Int] = db.run {
    val author = Author(id, surname, name)
    authorTable.filter(_.id === id).update(author)
  }

  def delete(id: Int): Future[Int] = db.run {
    authorTable.filter(_.id === id).delete
  }
}
