FROM python:3.7-alpine

COPY requirements.txt /tmp
RUN pip3 install -r /tmp/requirements.txt
ENV FLASK_APP /app/app.py

COPY /app.py /app/app.py

CMD ["python3", "-u", "-m", "flask", "run", "--host=0.0.0.0"]
