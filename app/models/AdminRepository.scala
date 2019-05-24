package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class AdminRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class AdminTable(tag: Tag) extends Table[Admin](tag, "t_admins") {
    def id = column[Int]("admin_id", O.PrimaryKey, O.AutoInc)

    def username = column[String]("username")

    def password = column[String]("password")

    def email = column[String]("email")

    def * = (id, username, password, email) <> ((Admin.apply _).tupled, Admin.unapply)
  }

  val admin = TableQuery[AdminTable]

  def list(): Future[Seq[Admin]] = db.run {
    admin.result
  }
}
