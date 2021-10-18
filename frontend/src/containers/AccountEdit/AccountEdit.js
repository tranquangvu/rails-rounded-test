import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";

import AccountForm from "./AccountForm";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingIndicator from "../../components/LoadingIndicator";
import useNotification from "../../hooks/useNotification";
import request from "../../request";

const defaultAccountData = {
  name: "",
  bankNumber: "",
};

function AccountEdit() {
  const { id } = useParams();
  const { notify } = useNotification();
  const [account, setAccount] = useState(id ? null : defaultAccountData);
  const [loadingStatus, setLoadingStatus] = useState(id ? "loading" : "loaded");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function loadAccount() {
      try {
        const response = await request(`/accounts/${id}`, {
          method: "GET",
        });
        if (response.ok) {
          setAccount(camelcaseKeys(response.body));
          setLoadingStatus("loaded");
        } else {
          setLoadingStatus("error");
        }
      } catch (error) {
        setLoadingStatus("error");
      }
    }

    if (id) {
      loadAccount();
    }
  }, [id]);

  const handleSave = async (changes) => {
    try {
      setIsSaving(true);
      const url = account.id ? `/accounts/${account.id}` : "/accounts";
      const method = account.id ? "PATCH" : "POST";
      const body = snakecaseKeys({ account: account.id ? changes : { ...defaultAccountData, ...changes } });

      const response = await request(url, {
        method,
        body,
      });
      if (response.ok) {
        setAccount(response.body);
        notify({
          message: `${account.id ? "Update" : "Create"} account successfully`,
          type: "success",
        });
      } else {
        const errors = Object.values(response.body).flat();
        const errorsDetail = errors.join(", ");
        notify({
          message: `Failed to save account: ${errorsDetail}. Please try again`,
          type: "error",
        });
      }
    } catch (error) {
      notify({
        message: "Failed to save account. Please check your internet connection",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await request(`/accounts/${account.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        history.push("/accounts");
        notify({
          message: "Delete account successfully",
          type: "success",
        });
      } else {
        notify({
          message: "Failed to delete account. Please try again",
          type: "error",
        });
      }
    } catch (error) {
      notify({
        message: "Failed to delete account. Please check your internet connection",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  switch (loadingStatus) {
    case "loading":
      return <LoadingIndicator />;
    case "error":
      return <ErrorMessage />;
    case "loaded":
      return (
        <AccountForm
          account={account}
          onSave={handleSave}
          disabled={isSaving || isDeleting}
          onDelete={handleDelete}
        />
      );
    default:
      console.error(`Unexpected loadingStatus: ${loadingStatus}`);
      return null;
  }
}

export default AccountEdit;
