import tensorflow as tf
import numpy as np
from keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt

TRAIN_DIR = "./Train"
TEST_DIR = "./Test"
VAL_DIR = "./Validate"

# data augmemtation and prepration

train_datagen = ImageDataGenerator(
                    rescale = 1. / 255,
                    shear_range = 0.2,
                    zoom_range=0.2 ,
                    horizontal_flip=True)
train_set = train_datagen.flow_from_directory(TRAIN_DIR, target_size=(224,224), batch_size=32 , class_mode='categorical')



val_datagen = ImageDataGenerator(rescale = 1. / 255)

val_set = val_datagen.flow_from_directory(VAL_DIR, target_size=(224,224), batch_size=32 , class_mode='categorical')
print("Número de muestras de entrenamiento:", len(train_set))
print("Número de muestras de validación:", len(val_set))
# build the model
model = tf.keras.models.Sequential()
model.add(tf.keras.layers.Conv2D(filters=32 , kernel_size = (5,5) , padding='Same', activation='relu', input_shape=[224,224,3])  )
model.add(tf.keras.layers.MaxPool2D(pool_size=(2,2), strides=(2,2) ))

model.add(tf.keras.layers.Conv2D(filters=64 , kernel_size = (5,5) , padding='Same', activation='relu'  ))
model.add(tf.keras.layers.MaxPool2D(pool_size=(2,2), strides=(2,2) ))
model.add(tf.keras.layers.Dropout(0.5))

model.add(tf.keras.layers.Conv2D(filters=96 , kernel_size = (5,5) , padding='Same', activation='relu'  ))
model.add(tf.keras.layers.MaxPool2D(pool_size=(2,2), strides=(2,2) ))
model.add(tf.keras.layers.Dropout(0.5))

model.add(tf.keras.layers.Conv2D(filters=96 , kernel_size = (5,5) , padding='Same', activation='relu'  ))
model.add(tf.keras.layers.MaxPool2D(pool_size=(2,2), strides=(2,2) ))
model.add(tf.keras.layers.Dropout(0.5))

#Flatten before the Dense layer

model.add(tf.keras.layers.Flatten())

model.add(tf.keras.layers.Dense (units=512 , activation='relu'))

# the last layer
model.add(tf.keras.layers.Dense(units=10 , activation='softmax'))

print( model.summary())

# compile the model 
model.compile(optimizer='rmsprop' , loss='categorical_crossentropy' , metrics=['accuracy']   )

history = model.fit (x=train_set, validation_data=val_set, batch_size=32 , epochs=20)


acc = history.history['accuracy']
val_acc = history.history['val_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']

print(acc)
print(val_acc)

#lets continue with displaying the result using pyplot

epochs_range = range(20) # creating a sequence of number from 0 to 20

plt.figure(figsize=(8,8))

plt.subplot(1,2,1)
plt.plot(epochs_range, acc, label = "Training Accuracy")
plt.plot(epochs_range, val_acc, label = "Validation Accuracy")
plt.legend(loc='lower right')
plt.title('Training and validation Accuracy')

plt.subplot(1,2,2)
plt.plot(epochs_range, loss ,label = "Training Loss")
plt.plot(epochs_range, val_loss, label = "Validation Loss")
plt.legend(loc='upper right')
plt.title('Training and validation Loss')

plt.show()

#lets stop and run again
model.save('./flowers.h5')