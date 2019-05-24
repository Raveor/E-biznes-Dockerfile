package models

import play.api.libs.json.Json

case class Order2Books(order_id: Int, book_id: Int)

object Order2Books {
  implicit val order2BooksFormat = Json.format[Order2Books]
}
