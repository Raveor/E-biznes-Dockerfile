import com.typesafe.sbt.SbtScalariform._

import scalariform.formatter.preferences._
lazy val root = (project in file(".")).enablePlugins(PlayScala)

name := "ebiznes"
 
version := "1.0" 
      
lazy val `ebiznes` = (project in file(".")).enablePlugins(PlayScala)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
resolvers += "Akka Snapshot Repository" at "http://repo.akka.io/snapshots/"

resolvers += Resolver.jcenterRepo

resolvers += "Sonatype snapshots" at "https://oss.sonatype.org/content/repositories/snapshots/"

scalaVersion := "2.12.6"

libraryDependencies ++= Seq(
  "com.mohiva" %% "play-silhouette" % "6.0.0-SNAPSHOT",
  "com.mohiva" %% "play-silhouette-password-bcrypt" % "6.0.0-SNAPSHOT",
  "com.mohiva" %% "play-silhouette-persistence" % "6.0.0-SNAPSHOT",
  "com.mohiva" %% "play-silhouette-crypto-jca" % "6.0.0-SNAPSHOT",
  "org.webjars" %% "webjars-play" % "2.7.0",
  "org.webjars" % "bootstrap" % "3.3.7-1" exclude("org.webjars", "jquery"),
  "org.webjars" % "jquery" % "3.2.1",
  "net.codingwell" %% "scala-guice" % "4.1.0",
  "com.iheart" %% "ficus" % "1.4.3",
  "com.typesafe.play" %% "play-mailer" % "7.0.0",
  "com.typesafe.play" %% "play-mailer-guice" % "7.0.0",
  "com.enragedginger" %% "akka-quartz-scheduler" % "1.6.1-akka-2.5.x",
  "com.adrianhurt" %% "play-bootstrap" % "1.4-P26-B3-SNAPSHOT",
  "com.mohiva" %% "play-silhouette-testkit" % "6.0.0-SNAPSHOT" % "test",
  specs2 % Test,
  ehcache,
  guice,
  filters
)

libraryDependencies ++= Seq(  ehcache , ws , specs2 % Test , guice)
libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.24"
libraryDependencies += "com.typesafe.play" %% "play-slick" % "3.0.3"
libraryDependencies += "com.typesafe.play" %% "play-slick-evolutions" % "3.0.3"

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

routesImport += "utils.route.Binders._"
libraryDependencies += specs2 % Test


// https://github.com/playframework/twirl/issues/105
TwirlKeys.templateImports := Seq()

scalacOptions ++= Seq(
  "-deprecation", // Emit warning and location for usages of deprecated APIs.
  "-feature", // Emit warning and location for usages of features that should be imported explicitly.
  "-unchecked", // Enable additional warnings where generated code depends on assumptions.
  "-Xfatal-warnings", // Fail the compilation if there are any warnings.
  //"-Xlint", // Enable recommended additional warnings.
  "-Ywarn-adapted-args", // Warn if an argument list is modified to match the receiver.
  "-Ywarn-dead-code", // Warn when dead code is identified.
  "-Ywarn-inaccessible", // Warn about inaccessible types in method signatures.
  "-Ywarn-nullary-override", // Warn when non-nullary overrides nullary, e.g. def foo() over def foo.
  "-Ywarn-numeric-widen", // Warn when numerics are widened.
  // Play has a lot of issues with unused imports and unsued params
  // https://github.com/playframework/playframework/issues/6690
  // https://github.com/playframework/twirl/issues/105
  "-Xlint:-unused,_"
)

//********************************************************
// Scalariform settings
//********************************************************

scalariformAutoformat := true

ScalariformKeys.preferences := ScalariformKeys.preferences.value
  .setPreference(FormatXml, false)
  .setPreference(DoubleIndentConstructorArguments, false)
  .setPreference(DanglingCloseParenthesis, Preserve)
