# IA Hackathon Project NASA

## Download Project

```bash
git clone https://github.com/i-am-sergio/ia_hackathon_project.git
```
* Cambia el nombre_de_tu_rama por tu nombre
```bash
git branch nombre_de_tu_rama
```
```bash
git checkout nombre_de_tu_rama
```

* Para preparar tus cambios a subir
```bash
git add .
```

* Para describir tus cambios:
```bash
git commit -m "descripcion de tus cambios"
```

* Para subir tus cambios a github:
```bash
git push origin nombre_de_tu_rama
```

## Machine Learning

### Instalación del Entorno Conda "Flowers"

1. Descarga e instala Anaconda desde [el sitio web oficial](https://www.anaconda.com/download).

2. Abre "Anaconda Prompt" desde tu sistema operativo.

3. Ubícate en tu carpeta de trabajo deseada. Por ejemplo, si tu carpeta de trabajo está en `D:/Work`, utiliza el siguiente comando:

   ```shell
   cd D:/Work
    ```

1. Crea un nuevo entorno conda llamado "Flowers" con Python 3.10 utilizando el siguiente comando:
   ```shell
    conda create -n Flowers python=3.10
   ```
2. Activa el entorno conda "Flowers" con el siguiente comando:
   ```shell
    conda activate Flowers
   ```
   Para desactivar el entorno conda "Flowers" cuando se deje de usar es el siguiente comando:
   ```shell
    conda deactivate
   ```
3. Instala las bibliotecas necesarias para TensorFlow y GPU con los siguientes comandos:
   ```shell
    conda install -c conda-forge cudatoolkit=11.2 cudnn=8.1.0
   ```
4. Instala TensorFlow versión <2.11 y otras bibliotecas esenciales con estos comandos:
   ```shell
    python -m pip install "tensorflow<2.11"
    conda install matplotlib opencv scikit-learn pandas
    pip install imutils
   ```


### Verificación de la Instalación de TensorFlow
Para verificar si TensorFlow se ha instalado correctamente, puedes copiar y pegar el siguiente código en un archivo llamado main.py:
```python
    import tensorflow as tf

    # Verifica si TensorFlow detecta alguna GPU
    if tf.test.gpu_device_name():
        print("GPU encontrada:")
        print(tf.test.gpu_device_name())
    else:
        print("No se encontró una GPU. TensorFlow está utilizando la CPU.")
```
Luego, ejecuta el siguiente comando en tu entorno conda "Flowers":
```shell
    python main.py
```
Si la instalación se realizó con éxito, deberías ver una salida que indica si se ha encontrado una GPU o si TensorFlow está utilizando la CPU. Como esta salida:

![Salida de ejecución de Prueba de GPU](/neural_red/img/test.png)

### Creación de Modelo de Convolución para Clasificar Flores con Deep Learning

En este proyecto, hemos desarrollado un modelo de aprendizaje profundo utilizando redes neuronales convolucionales (CNN) para llevar a cabo la clasificación de flores. Para comprender mejor esta afirmación, es importante desglosar algunos de los conceptos clave involucrados:

- **Aprendizaje Profundo (Deep Learning)**: El aprendizaje profundo es una rama del aprendizaje automático (Machine Learning) que se centra en la construcción y entrenamiento de redes neuronales artificiales profundas para llevar a cabo tareas de procesamiento de datos más complejas. A diferencia del aprendizaje automático tradicional, el aprendizaje profundo involucra redes neuronales con múltiples capas (de ahí el término "profundo") que pueden aprender y representar patrones y características de datos de manera jerárquica.

- **Redes Neuronales Convolucionales (CNN)**: Las redes neuronales convolucionales son un tipo específico de arquitectura de redes neuronales profundas diseñadas para el procesamiento eficiente de datos estructurados, como imágenes y videos. Estas redes utilizan capas de convolución para extraer características relevantes de los datos de entrada, lo que las hace especialmente adecuadas para tareas de visión por computadora y clasificación de imágenes.

En este proyecto, hemos aplicado técnicas de aprendizaje profundo utilizando una CNN para entrenar un modelo capaz de identificar y clasificar diferentes tipos de flores a partir de imágenes. El modelo se entrena utilizando un conjunto de datos de flores etiquetadas, y luego se evalúa su rendimiento en un conjunto de prueba. Posteriormente, se compara con otro modelo y se selecciona el modelo con el mejor rendimiento para su posterior uso.

La utilización de aprendizaje profundo y CNN en este contexto es importante porque permite la creación de sistemas de clasificación de imágenes altamente precisos y automáticos, lo que puede ser valioso en diversas aplicaciones, desde la identificación de especies de plantas hasta la detección de objetos en imágenes médicas. Además, esta tecnología tiene un gran potencial para automatizar tareas que requerirían un esfuerzo humano significativo, lo que ahorra tiempo y recursos.

Aquí te guiaré a través de los pasos principales del proceso.

### Descarga y Organización de la Base de Datos

1. Descargamos la base de datos de flores desde el siguiente enlace: [Base de Datos de Flores](https://www.kaggle.com/datasets/jonathanflorez/extended-flowers-recognition/).

2. Luego, organizamos los datos en cuatro carpetas: Original, Test, Train y Validate. Esto se hace para dividir el conjunto de datos en entrenamiento, prueba y validación.

### Entrenamiento del Modelo

Ejecutamos el código del archivo `model.py` en nuestro entorno virtual de Anaconda utilizando el siguiente comando:

```bash
python model.py
```

También ejecutamos el archivo `model2.py` de la misma manera:

```bash
python model2.py
```
![Salida de ejecución de Model2](/neural_red/img/Execution_model_2.png)

### Comparación de Modelos

Después de ejecutar los modelos, generamos dos gráficos utilizando la biblioteca Matplotlib para comparar su rendimiento.

Modelo 1: Gráfico del Modelo 1
![Grafico de Model1](/neural_red/img/Figure_1.png)

Modelo 2: Gráfico del Modelo 2
![Grafico de Model2](/neural_red/img/test(1).png)

Basándonos en la comparación de estos gráficos, decidimos que el modelo 1 es el más adecuado para nuestra tarea de clasificación de flores.

### Exportación del Modelo a Formato JSON
Para usar el modelo en el backend de nuestra aplicación, lo exportamos a formato JSON. Creamos una carpeta llamada "Output" y utilizamos el siguiente comando en nuestro entorno virtual anaconda:

```bash
tensorflowjs_converter --input_format keras flowers.h5 Output
```
Esto nos proporciona los archivos necesarios para utilizar el modelo en nuestra aplicación.

Con esto, hemos completado con éxito la creación y evaluación de nuestro modelo de convolución para clasificar flores.