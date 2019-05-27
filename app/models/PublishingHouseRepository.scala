package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class PublishingHouseRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class PublishingHouseTable(tag: Tag) extends Table[PublishingHouse](tag, "t_publishing_houses") {
    def id = column[Int]("publishing_house_id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def * = (id, name) <> ((PublishingHouse.apply _).tupled, PublishingHouse.unapply)
  }

  val publishingHouse = TableQuery[PublishingHouseTable]

  def list(): Future[Seq[PublishingHouse]] = db.run {
    publishingHouse.result
  }

  def getById(id: Int): Future[Seq[PublishingHouse]] = db.run {
    publishingHouse
      .filter(_.id === id)
      .result
  }

  def insert(name: String): Future[Int] = db.run {
    publishingHouse += PublishingHouse(0, name)
  }

}
