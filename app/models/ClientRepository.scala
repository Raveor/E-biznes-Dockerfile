package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ClientRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class ClientTable(tag: Tag) extends Table[Client](tag, "t_clients") {
    def id = column[Int]("client_id", O.PrimaryKey, O.AutoInc)

    def username = column[String]("username")

    def twitter_id = column[Int]("twitter_id")

    def google_id = column[Int]("google_id")

    def admin_flag = column[Boolean] ("admin_flag")

    def email = column[String]("email")

    def * = (id, username, email, twitter_id, google_id, admin_flag) <> ((Client.apply _).tupled, Client.unapply)
  }

  val client = TableQuery[ClientTable]

  def list(): Future[Seq[Client]] = db.run {
    client.result
  }

  def getById(id: Int): Future[Seq[Client]] = db.run {
    client
      .filter(_.id === id)
      .result
  }

  def edit(id: Int, username: String, email: String, twitter_id: Int, google_id: Int, admin_flag: Boolean) : Future[Int] = db.run {
    client.filter(_.id === id).update(Client(id, username, email, twitter_id, google_id, admin_flag))
  }

  def delete(id: Int) : Future[Int] = db.run {
    client.filter(_.id === id).delete
  }

}
