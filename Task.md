Kaip ir minejau, gausi padaryti api!

Esme api kad turi naudoti cluster (ez) ir ccxt lib!

Api turi tureti endpoint per kuriuos galima pasiimti:
[X] all symbolius (butent turi pagal id o ne tsg ka ccxt grazina savaip standartizave),
[X] ticker,
[X] ob,
[X] balance
[X] ir place_order ( imesti tsg orderi i exchange, jokiu checkinimu jokiu nk ).

Preoritetas yra balance ir place_order jei matysi kad per daug ar pns.

[X] Problemu gali iskilti - ccxt uzsiloadint marketus turi, pries pradedant kzk tokio daryt,
tai turetis local atminti juos updatint periodiskai!

Balance ir place order turi duoti api_key, tai turesi siusti i api encryptintus juos ir pasave decryptint ( dirikas norejo kad storintum pt viska pas save, kad nereiktu siuntinet, bet cia auth butu ir pns tai galvoju per daug tau)!

Zinoma geras error handlinimas, nes ccxt nevisai standartizuotas, o kadangi api dinaminis, tai kad bent kol kas nebutu proc crashinanciu error.
