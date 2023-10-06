## Instalación del Entorno Conda "Flowers"

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

![Salida de ejecución de Prueba de GPU](img/test.png)
