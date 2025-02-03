import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import hd from "../assets/images/header.png";
import ft from "../assets/images/feat.png";
import table from "../assets/images/table.png";
const MyDocument = ({ dataUser, grade, teacher, mejora }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
      marginTop: 60,
      paddingLeft: 10,
    },
    header: {
      position: "absolute",
      top: -50,
      left: 0,
      right: 0,
      textAlign: "center",
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      top: 720,
      textAlign: "center",
    },
    container: {
      paddingHorizontal: 40,
    },
    text: {
      fontFamily: "Helvetica", // Asegúrate de que la fuente esté disponible
      fontSize: 11,
      fontWeight: "bold", // Cambiar peso de la fuente
      lineHeight: 1.5,
    },
  });

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Datos de la fecha actual
  const currentDate = new Date();
  const currentDay = currentDate.getDate(); // Día del mes
  const currentMonth = months[currentDate.getMonth()]; // Nombre del mes
  const currentYear = currentDate.getFullYear(); // Año

  // Ciudad fija y formato deseado
  const city = "Esmeraldas";
  const formattedDate = `${city}, ${currentDay} de ${currentMonth} del ${currentYear}`;
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image src={hd} style={{ width: "100%" }}></Image>
        </View>
        <View style={{ paddingVertical: 30, paddingHorizontal: 60 }}>
          {" "}
          <Text
            style={{
              fontSize: 12,
              paddingTop: 50,
              textAlign: "center",
              fontWeight: "extrabold",
            }}
          >
            SOLICTUD PARA MEJORA {mejora.toUpperCase()} DE CALIFICACIÓN
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "extrabold",
              textAlign: "center",
            }}
          >
            {mejora.includes("Indirecta")
              ? "(entre 0,01 - 6,99 puntos)" // Si incluye 'mejora'
              : "(entre 7,00 - 9,00 puntos)"}
          </Text>
          <Text style={{ textAlign: "right", fontSize: 11 }}>
            {"\n"}
            {"\n"}
            {formattedDate}
          </Text>
          <Text style={styles.text}>Señor/a.</Text>
          <Text style={styles.text}>Lic./Mgt. {teacher.nombreCompleto} </Text>
          <Text style={styles.text}>
            Docente de la asignatura de {grade.nombre}
          </Text>
          <Text style={styles.text}>
            Presente. - {"\n"}
            {"\n"} De mis consideraciones: {"\n"}
            {"\n"}
          </Text>
          <Text style={styles.text}>
            Yo, {dataUser.representanteNombre} con cédula de identidad N°{" "}
            {dataUser.representanteCedula}, en mi calidad de representante legal
            de {dataUser.nombreCompleto}, estudiante del {dataUser.grado}{" "}
            paralelo "{dataUser.paralelo}" de la jornada {dataUser.jornada}
            {mejora.includes("Indirecta")
              ? "; en virtud del bajo rendimiento de mi representado/a, \n SOLICITO muy comedidamente se realice el proceso de refuerzo pedagógico que Ud. determine con el propósito de mejorar su desempeño académico.\n "
              : ". \n"}
            {"\n"} En tal virtud, le expreso mi compromiso de colaborar con las
            estrategias implementadas para dicho propósito, quedando en espera
            de las fechas y horario que se establezca.{"\n"}
            {"\n"} Por la atención que dé a la presente, le anticipo mi
            agradecimiento. {"\n"}
            {"\n"}Atentamente,{"\n"} {dataUser.representanteNombre}
            {"\n"}REPRESENTANTE LEGAL DEL ESTUDIANTE
          </Text>
          <Text style={styles.text}>
            {"\n"}Respuesta:{"\n"}
            Se realizará el refuerzo pedagógico solicitado los días: ………………………….
            de …… a …… horas.{"\n"}
            {"\n"}
          </Text>
          <Text style={styles.text}>
            Firmas:{"\n"}
            {"\n"}
          </Text>
          <View style={{ borderWidth: 1 }}>
            <Image src={table}></Image>
          </View>
        </View>

        <View style={styles.footer}>
          <Image src={ft}></Image>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
