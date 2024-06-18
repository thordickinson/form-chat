import { Form } from "./form/api";

export const FormularioConsulta: Form = {
  "system": "Formulario de Consulta Médica",
  "groups": [
    {
      "name": "Datos Personales y Antecedentes",
      "description": "Sección para capturar datos personales y antecedentes.",
      "system": "datos_personales_y_antecedentes",
      "fields": [
        {
          "label": "Nombre",
          "name": "nombre",
          "type": "text",
          "system": "datos_personales_y_antecedentes",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: María Pérez"
        },
        {
          "label": "Edad",
          "name": "edad",
          "type": "number",
          "system": "datos_personales_y_antecedentes",
          "placeholder": "Ingrese su edad",
          "hint": "Ejemplo: 45 años"
        },
        {
          "label": "Género",
          "name": "genero",
          "type": "text",
          "system": "datos_personales_y_antecedentes",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: Femenino"
        }
      ]
    },
    {
      name: "Antecedentes Familiares",
      description: "Sección para capturar antecedentes familiares.",
      system: "antecedentes_familiares",
      fields: [
        {
          "label": "¿Alguno de sus familiares han sufrido de diabetes?",
          "name": "antecedentesFamiliaresDiabetes",
          "type": "boolean",
          "system": "datos_personales_y_antecedentes",
          "placeholder": "Seleccione una opción",
          "hint": "Ejemplo: Sí"
        },
        {
          "label": "¿Alguno de sus familiares ha sido diagnosticado con hipertensión?",
          "name": "antecedentesFamiliaresHipertension",
          "type": "boolean",
          "system": "datos_personales_y_antecedentes",
          "placeholder": "Seleccione una opción",
          "hint": "Ejemplo: Sí"
        }
      ]
    },
    {
      "name": "Estilo de Vida y Hábitos",
      "description": "Sección para capturar estilo de vida y hábitos.",
      "system": "estilo_de_vida_y_habitos",
      "fields": [
        {
          "label": "¿Fuma o consume alcohol? ¿Con qué frecuencia?",
          "name": "fumaConsumeAlcoholFrecuencia",
          "type": "text",
          "system": "estilo_de_vida_y_habitos",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: No fuma, consume alcohol ocasionalmente"
        },
        {
          "label": "¿Realiza alguna actividad física regularmente?",
          "name": "actividadFisicaRegular",
          "type": "text",
          "system": "estilo_de_vida_y_habitos",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: Sí, camina 30 minutos diarios"
        },
        {
          "label": "¿Cómo describiría su dieta diaria?",
          "name": "dietaDiaria",
          "type": "text",
          "system": "estilo_de_vida_y_habitos",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: Balanceada, rica en frutas y verduras"
        }
      ]
    },
    {
      "name": "Revisión de Sistemas",
      "description": "Sección para capturar la revisión de sistemas.",
      "system": "revision_de_sistemas",
      "fields": [
        {
          "label": "Neurológico: ¿Ha tenido dolores de cabeza o mareos?",
          "name": "neurologicoDoloresCabezaMareos",
          "type": "text",
          "system": "revision_de_sistemas",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: No"
        },
        {
          "label": "Cardiovascular: ¿Siente dolor en el pecho?",
          "name": "cardiovascularDolorPecho",
          "type": "text",
          "system": "revision_de_sistemas",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: No"
        },
        {
          "label": "Digestivo: ¿Tiene náuseas, vómitos o cambios en el hábito intestinal?",
          "name": "digestivoNauseasVomitosCambios",
          "type": "text",
          "system": "revision_de_sistemas",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: No"
        }
      ]
    },
    {
      "name": "Salud Mental",
      "description": "Sección para capturar salud mental.",
      "system": "salud_mental",
      "fields": [
        {
          "label": "¿Cómo se ha sentido emocionalmente últimamente?",
          "name": "estadoEmocional",
          "type": "text",
          "system": "salud_mental",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: Algo estresada por el trabajo"
        },
        {
          "label": "¿Ha experimentado estrés, ansiedad o depresión?",
          "name": "estresAnsiedadDepresion",
          "type": "text",
          "system": "salud_mental",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: Estrés leve"
        }
      ]
    },
    {
      "name": "Síntomas Actuales",
      "description": "Sección para capturar síntomas actuales.",
      "system": "sintomas_actuales",
      "fields": [
        {
          "label": "¿Puede describir sus síntomas?",
          "name": "descripcionSintomas",
          "type": "text",
          "system": "sintomas_actuales",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: Dolor punzante en la frente y sienes"
        },
        {
          "label": "¿Cuándo comenzaron los síntomas?",
          "name": "inicioSintomas",
          "type": "text",
          "system": "sintomas_actuales",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: Hace dos semanas"
        },
        {
          "label": "¿Los síntomas son constantes o intermitentes?",
          "name": "frecuenciaSintomas",
          "type": "text",
          "system": "sintomas_actuales",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: Constantes"
        },
        {
          "label": "¿Hay algo que mejore o empeore los síntomas?",
          "name": "factoresMejoraEmpeoraSintomas",
          "type": "text",
          "system": "sintomas_actuales",
          "placeholder": "Ingrese la respuesta",
          "hint": "Ejemplo: Mejoran con descanso, empeoran con luz brillante"
        }
      ]
    }
  ]
}
