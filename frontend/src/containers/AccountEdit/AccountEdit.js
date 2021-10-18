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
  const history = useHistory();
  const [account, setAccount] = useState(id ? null : defaultAccountData);
  const [loadingStatus, setLoadingStatus] = useState(id ? "loading" : "loaded");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { notify } = useNotification();
  const isEditMode = !!id;

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
      const url = isEditMode ? `/accounts/${account.id}` : "/accounts";
      const method = isEditMode ? "PATCH" : "POST";
      const body = snakecaseKeys({ account: isEditMode ? changes : { ...defaultAccountData, ...changes } });

      const response = await request(url, {
        method,
        body,
      });
      if (response.ok) {
        setAccount(response.body);
        notify({
          message: `${isEditMode ? "Update" : "Create"} account successfully`,
          type: "success",
        });
      } else {
        notify({
          message: "Failed to save account. Please try again",
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
          title={`${isEditMode ? "Update" : "Create"} Account`}
          account={account}
          onSave={handleSave}
          disabled={isSaving || isDeleting}
          onDelete={handleDelete}
        />
      );
    default:
      throw new Error(`Unexpected loadingStatus: ${loadingStatus}`);
  }
}

export default AccountEdit;
