import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "baseui/modal";
import { FileUploader } from "baseui/file-uploader";
import { Spinner } from "baseui/spinner";

import axios from "axios";

import Button from "./../../../components/utility/Button";
import PageTitle from "../../../components/utility/PageTitle";
import TextInput from "../../../components/utility/TextInput";
import ParagraphInput from "../../../components/utility/ParagraphInput";
import Label from "../../../components/utility/Label";
import useLazyFetch from "../../../customHooks/useLazyFetch";

const MediaUpload = ({ medias, setService }) => {
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [media, setMedia] = useState({
    fileName: null,
    description: "",
    type: "",
    heading: ""
  });

  const {
    data: newMediaData,
    loading,
    fetch: sendReq,
    error,
    clearData
  } = useLazyFetch({
    url: `${process.env.REACT_APP_adventureServerHostName}/api/v1/medias`,
    method: "post"
  });

  const handleModalClose = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (media.fileName && !newMediaData) {
      const { fileName, description, type, heading } = media;
      sendReq({ heading, fileName, description, type });
    } else {
      // Also set media in service state
      setShowModal(false);
    }

    clearData();
    setMedia({
      fileName: null,
      description: "",
      type: "",
      heading: ""
    });

    setUploadProgress(0);
  };

  useEffect(() => {
    if (newMediaData) {
      // Close the modal
      setService({
        type: "SINGLE_VALUE",
        key: "medias",
        payload: [...medias, newMediaData.media]
      });
      handleModalClose();
    }
  }, [newMediaData]);

  const handleOnCancel = () => {
    setUploadProgress(0);
    if (media.fileName) {
      // Send request to delete media
    }
  };

  const handleFileUpload = file => {
    if (file.type.indexOf("image/") === 0) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(
          `${process.env.REACT_APP_adventureServerHostName}/api/v1/files`,
          formData,
          {
            headers: {},
            onUploadProgress: ({ loaded, total }) => {
              setUploadProgress(parseInt((loaded / total) * 100));
            }
          }
        )
        .then(response => {
          setUploadProgress(100);
          setMedia({
            ...media,
            fileName: response.data.fileName,
            type: "IMAGE"
          });
        })
        .catch(err => {});
    }
  };

  return (
    <MediaUploadContainer>
      <MediaUploadButtonWrapper>
        <Button
          reverse
          onClick={e => {
            e.preventDefault();
            setShowModal(true);
          }}
          text="Upload Media"
          type="button"
        />
      </MediaUploadButtonWrapper>
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        autoFocus={false}
        overrides={{
          Dialog: {
            style: {
              width: "50vw",
              height: "80vh",
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll"
            }
          }
        }}
      >
        <ModalHeader>
          <PageTitle>Upload Media</PageTitle>
        </ModalHeader>
        <ModalBody>
          <TextInput
            showLabel={true}
            label="Heading"
            value={media.heading}
            onChange={e => {
              setMedia({ ...media, heading: e.target.value });
            }}
          />
          <Label
            label="Upload Media"
            style={{ marginBottom: "1rem", display: "inline-block" }}
          />
          <FileUploader
            multiple={false}
            onCancel={handleOnCancel}
            onDrop={(acceptedFiles, rejectedFiles) => {
              const fileToBeUploaded = acceptedFiles[0];
              handleFileUpload(fileToBeUploaded);
            }}
            progressAmount={uploadProgress}
            overrides={{
              FileDragAndDrop: {
                style: {
                  borderColor: "rgb(17, 151, 213)",
                  borderWidth: "1.5px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)"
                }
              },
              ContentMessage: {
                style: {
                  color: "rgb(2, 147, 214)"
                }
              },
              ContentSeparator: {
                style: { color: "rgb(17, 151, 213)" }
              }
            }}
          />
          <ParagraphInput
            showLabel={true}
            label="Description"
            value={media.description}
            onChange={e => {
              setMedia({ ...media, description: e.target.value });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleModalClose} text="Add Media" />
        </ModalFooter>
      </Modal>
    </MediaUploadContainer>
  );
};

const MediaUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%:
  align-items: center;
  justify-content: center;
  border-bottom: 0.15rem solid ${({ theme }) => theme.navIconsColor};
`;

const MediaUploadButtonWrapper = styled.div`
  margin: 4rem 0;
  display: flex;
  justify-content: center;
`;

export default MediaUpload;
