export enum ROUTE {
  DEPARTMENT_SWITCHER = "/switcher",
  CREATE_DEPARTMENT_MODAL = "/create-modal",
  GET_UPLOAD_DOCUMENT_PRESIGNED_URL = "/get-upload-document-presigned-url",
  UPLOAD_DOCUMENT_MODAL = "/upload-document-modal",
  DOCUMENT_DETAIL = "/document-detail/:documentId",
  DOCUMENT_FORM = "/document-form/:documentId",
  DOCUMENT_DOWNLOAD = "/document-download/:documentId",
  FOLDER_CONTENTS = "/folder-contents/:folderId",
  CREATE_FOLDER_MODAL = "/create-folder-modal",
  RAG_FILTER_MODAL = "/rag-filter-modal",
  RAG_FILTER_FOLDER_CONTENTS = "/rag-filter-folder/:folderId",
}
