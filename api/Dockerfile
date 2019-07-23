FROM python:3.7-alpine

RUN pip3 install flask
ENV FLASK_APP /app/app.py

COPY /app.py /app/app.py

CMD ["python3", "-u", "-m", "flask", "run", "--host=0.0.0.0"]
