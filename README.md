Тестовое задание

запуск сервера:

1 прейти в папку back

2 установить все зависимости

$ pip install -r requrements.txt

3 установить перменные среды SECRET_KEY и DATABASE_URI, например
$ export SECRET_KEY="hkhu8yyyrrttrrtr"
$ export DATABASE_URI="sqlite:///test.db"

4 запустить сервер командой
$ gunicorn tabel:app -p tabel.pid


адмика не закрыта павролем и доступна по адресу http://localhost:8000/admin/



