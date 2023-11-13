from typing import Any

import firebase_admin
from firebase_admin import credentials, firestore

from contract_proxy import config


class FireStore:
    def __init__(
        self,
        cred_path: str,
    ) -> None:
        cred = credentials.Certificate(cred_path)

        firebase_admin.initialize_app(cred)
        self._db = firestore.client()
        print("Fire Store: Initialize Complete!")

    def __call__(
        self,
    ) -> Any:
        return self._db

    def fetch(self, collection: str, id: str) -> dict:
        doc = self._db.collection(collection).document(id).get()
        return doc.to_dict()


db = FireStore(
    config.CRED_PATH,
)
