# Entering Interactive Mode

## 📌 Overview
Docker सिर्फ़ web servers के लिए नहीं है। कुछ apps user से **input** माँगते हैं (जैसे एक Python script जो numbers पूछती है)।
Docker isn't only for web servers. Some apps ask the user for **input** (like a Python script that asks for numbers).

## ❗ Problem
```bash
docker run myapp
```
Container input नहीं ले पाता और error देता है, क्योंकि कोई terminal input नहीं जुड़ा।
The container can't read input and fails, because no terminal input is connected.

## ✅ Solution: -it
```bash
docker run -it myapp
```
- `-i` (interactive): STDIN खुला रहता है ताकि आप type कर सकें।
  `-i` (interactive): keeps STDIN open so you can type.
- `-t` (tty): एक pseudo-terminal देता है, जिससे prompt ठीक दिखता है।
  `-t` (tty): allocates a pseudo-terminal so the prompt looks right.

## 🔁 Stopped interactive container फिर से चलाना
```bash
docker start -ai <name>
```
- `-a` = attach (output देखें), `-i` = interactive (input दें)।
  `-a` attaches (see output), `-i` makes it interactive (send input).

## 🐚 Running container के अंदर shell
```bash
docker exec -it <name> sh     # or bash, if the image has it
```
