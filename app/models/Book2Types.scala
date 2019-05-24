package models

import play.api.libs.json.Json

case class Book2Types(book_id: Int, type_id: Int)

object Book2Types {
  implicit val book2typesFormat = Json.format[Book2Types]
}