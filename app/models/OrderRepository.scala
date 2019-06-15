package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class OrderRepository @Inject()(val dbConfigProvider: DatabaseConfigProvider, val clientRepository: UserRepository)
                               (implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._
  import clientRepository.ClientTable
  class OrderTable(tag: Tag) extends Table[Order](tag, "t_orders") {
    def id = column[Int]("order_id", O.PrimaryKey, O.AutoInc)

    def client_id = column[Int]("client_id")

    def client_fk = foreignKey("ct_t_orders_client_id_fk", client_id, clientTable)(_.id)
    def * = (id, client_id) <> ((Order.apply _).tupled, Order.unapply)
  }

  val order = TableQuery[OrderTable]
  val clientTable = TableQuery[ClientTable]

  def list(): Future[Seq[Order]] = db.run {
    order.result
  }

  def getById(id: Int): Future[Seq[Order]] = db.run {
    order
      .filter(_.id === id)
      .result
  }

  def edit(id: Int, client_id: Int) : Future[Int] = db.run {
    order.filter(_.id === id).update(Order(id, client_id))
  }

  def delete(id: Int) : Future[Int] = db.run {
    order.filter(_.id === id).delete
  }

}
