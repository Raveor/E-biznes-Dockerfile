package models

import play.api.libs.json.Json

case class Book(id: Int, title: String, author: Int, publishingHouse: Int, publishYear: Int, description: String, price: Float, bookType: Int)

object Book {
  implicit val bookFormat = Json.format[Book]
}
