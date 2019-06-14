package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class Order2BooksRepository @Inject()(val dbConfigProvider: DatabaseConfigProvider, val orderRepository: OrderRepository,
                                      val bookRepository: BookRepository)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import orderRepository.OrderTable
  import bookRepository.BookTable
  import dbConfig._
  import profile.api._

  class Order2BooksTable(tag: Tag) extends Table[Order2Books](tag, "t_order2books") {
    def order_id = column[Int]("order_id", O.PrimaryKey)

    def book_id = column[Int]("book_id", O.PrimaryKey)

    def book_fk = foreignKey("ct_t_order2books_book_id_fk", book_id, bookTable)(_.id)
    def order_fk = foreignKey("ct_t_order2books_order_id_fk", order_id, orderTable)(_.id)

    def * = (order_id, book_id) <> ((Order2Books.apply _).tupled, Order2Books.unapply)
  }

  val order2Books = TableQuery[Order2BooksTable]
  val orderTable = TableQuery[OrderTable]
  val bookTable = TableQuery[BookTable]

  def list(): Future[Seq[Order2Books]] = db.run {
    order2Books.result
  }

  def getByIds(order_id: Int, book_id: Int): Future[Seq[Order2Books]] = db.run {
    order2Books
      .filter(_.book_id === book_id)
      .filter(_.order_id === order_id)
      .result
  }

  def delete(order_id: Int, book_id: Int) : Future[Int] = db.run {
    order2Books
      .filter(_.book_id === book_id)
      .filter(_.order_id === order_id)
      .delete
  }


}
