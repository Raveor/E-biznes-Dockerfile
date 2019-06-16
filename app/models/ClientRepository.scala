package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class ClientRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class ClientTable(tag: Tag) extends Table[Client](tag, "t_users") {
    def id = column[Int]("client_id", O.PrimaryKey, O.AutoInc)

    def username = column[String]("username")

    def twitter_id = column[Option[String]]("twitter_id")

    def facebook_id = column[Option[String]]("facebook_id")

    def admin_flag = column[Boolean]("admin_flag")

    def email = column[String]("email")

    def * = (id, username, email, twitter_id, facebook_id, admin_flag) <> ((Client.apply _).tupled, Client.unapply)
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

  def getByProvider(provider: String, id: String): Future[Seq[Client]] = db.run {
    if (provider == "facebook") {
      client.filter(_.facebook_id === id).result
    } else {
      client.filter(_.twitter_id === id).result
    }
  }

  def create(username: String, email: String, twitter_id: Option[String], facebook_id: Option[String], admin_flag: Boolean): Future[Int] = db.run {
    client += Client(0, username, email, twitter_id, facebook_id, admin_flag)
  }

  def delete(id: Int): Future[Int] = db.run {
    client.filter(_.id === id).delete
  }

  def setAdmin(id: Int, admin: Boolean): Future[Int] = db.run {
    client.filter(_.id === id).map(c => c.admin_flag).update(admin)
  }
}
