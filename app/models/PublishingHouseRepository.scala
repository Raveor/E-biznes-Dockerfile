package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class PublishingHouseRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  class PublishingHouseTable(tag: Tag) extends Table[PublishingHouse](tag, "t_publishing_houses") {
    def id = column[Int]("publishing_house_id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def * = (id, name) <> ((PublishingHouse.apply _).tupled, PublishingHouse.unapply)
  }

  val publishingHouseTable = TableQuery[PublishingHouseTable]

  def list(): Future[Seq[PublishingHouse]] = db.run {
    publishingHouseTable.result
  }

  def getById(id: Int): Future[Seq[PublishingHouse]] = db.run {
    publishingHouseTable
      .filter(_.id === id)
      .result
  }

  def insert(name: String): Future[Int] = db.run {
    publishingHouseTable += PublishingHouse(0, name)
  }

  def edit(id: Int, name: String): Future[Int] = db.run {
    val publishingHouse = PublishingHouse(id, name)
    publishingHouseTable.filter(_.id === id).update(publishingHouse)
  }

  def delete(id: Int): Future[Int] = db.run {
    publishingHouseTable.filter(_.id === id).delete
  }

}
