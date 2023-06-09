import React, { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import DataGrid, {
  Column,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import Spacer from "../../common/spacer/spacer";
import { RiSearchLine, RiFilter2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { sendData } from "../../../store/slices/data-slice";
import "./social-media-datagrid.scss";

const SocialMediaDatagrid = () => {
  const { mediaData } = useAppSelector((state) => state.data);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const allowedPageSizes = [4, 8, "all"]; // 4'er 8'er ya da hepsini göstermek için gerekli dizi
  const dispatch = useAppDispatch();

  const initialValues = {
    socialMediaLink: "",
    socialMediaName: "",
    desc: "",
  }; // kullanacağım interfaceleri oluşturduğum kısım

  const validationSchema = Yup.object({
    socialMediaLink: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Please Enter a Valid URL!"
      )
      .required("Please Enter Your Social Media Link"),
    socialMediaName: Yup.string().required(
      "Please Enter The Name of The Social Media"
    ),
    desc: Yup.string().required(
      "Please Enter a Description About Your Social Media"
    ),
  }); // initialValues kısmındaki interfaceleri validate ettiğim kısım

  const onSubmit = (values) => {
    let id2 = mediaData.length;
    id2++; // id'yi 1 den başlayarak eklemek için dizinin length'ini alıyorum başlangıç olarak 0, sonradan 1 ekliyorum ve 1 ile id başlıyor, her eklemede arttırıyorum bu sayede id 2 ,3 olarak ilerliyor
    const sendMediaData = [
      ...mediaData, // spread'den yararlanarak önceden olan objeleri ekliyorum
      {
        socialMediaLink: values.socialMediaLink,
        socialMediaName: values.socialMediaName,
        desc: values.desc,
        id: id2,
      },
    ];
    localStorage.setItem(
      "mediaData",
      JSON.stringify(sendMediaData) // mediaData isminde localStorage set ediyorum
    );
    dispatch(sendData(sendMediaData)); // merkezi state'i güncelliyorum
    formik.resetForm(); // form'u temizliyorum
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  }); // formik library kullanımı 3 aşamadan oluşuyor bunları belirttiğim kısım

  return (
    <>
      <Spacer height={40} />
      <div className="datagrid">
        <Container>
          <div className="topbar">
            <div className="mb-3 topbar-left">
              <RiSearchLine className="search-icon" />
              <RiFilter2Fill className="d-sm-inline d-none filter-icon" />
            </div>
            <Button
              variant="primary"
              type="submit"
              className="d-sm-inline d-none"
              onClick={handleShow}
            >
              <FaPlus /> Yeni Hesap Ekle
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="d-inline d-sm-none"
              onClick={handleShow}
            >
              <FaPlus />
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <Form.Group className="mb-3" controlId="socialMediaLink">
                    <Form.Label>Sosyal Medya Linki</Form.Label>
                    <Form.Control
                      type="url"
                      autoFocus
                      {...formik.getFieldProps("socialMediaLink")}
                      isValid={
                        formik.touched.socialMediaLink &&
                        !formik.errors.socialMediaLink
                      }
                      isInvalid={
                        formik.touched.socialMediaLink &&
                        !!formik.errors.socialMediaLink
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.socialMediaLink}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="socialMediaName">
                    <Form.Label>Sosyal Medya Adı</Form.Label>
                    <Form.Control
                      type="text"
                      {...formik.getFieldProps("socialMediaName")}
                      isValid={
                        formik.touched.socialMediaName &&
                        !formik.errors.socialMediaName
                      }
                      isInvalid={
                        formik.touched.socialMediaName &&
                        !!formik.errors.socialMediaName
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.socialMediaName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="desc">
                    <Form.Label>Açıklama</Form.Label>
                    <Form.Control
                      type="text"
                      {...formik.getFieldProps("desc")}
                      isValid={formik.touched.desc && !formik.errors.desc}
                      isInvalid={formik.touched.desc && !!formik.errors.desc}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.desc}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Vazgeç
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!(formik.dirty && formik.isValid)}
                    onClick={handleClose}
                  >
                    Kaydet
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
          <DataGrid
            dataSource={mediaData}
            keyExpr="id"
            showBorders={true}
            className="d-xl-none"
            columnHidingEnabled={true} // responsive tasarım için kullanıyorum ama sığabilecek olsa bile responsive yaptığı için 2 tane datagrid var, bu datagrid xl'den önce gözükmüyor
          >
            <Scrolling rowRenderingMode="virtual"></Scrolling>
            <Paging defaultPageSize={4} />
            <Pager
              visible={true}
              allowedPageSizes={allowedPageSizes}
              displayMode="compact"
              showPageSizeSelector={true}
              showInfo={false}
              showNavigationButtons={true}
            />
            <SearchPanel visible={true} placeholder="Search objects..." />
            <Column
              dataField="socialMediaLink"
              caption={"Sosyal Medya Linki"}
            />
            <Column dataField="socialMediaName" caption={"Sosyal Medya Adı"} />
            <Column dataField="desc" caption={"Açıklama"} />
          </DataGrid>
          <DataGrid
            dataSource={mediaData}
            keyExpr="id"
            showBorders={true}
            className="d-xl-block d-none"
          >
            <Scrolling rowRenderingMode="virtual"></Scrolling>
            <Paging defaultPageSize={4} />
            <Pager
              visible={true}
              allowedPageSizes={allowedPageSizes}
              displayMode="compact"
              showPageSizeSelector={true}
              showInfo={false}
              showNavigationButtons={true}
            />
            <SearchPanel visible={true} placeholder="Search objects..." />
            <Column
              dataField="socialMediaLink"
              caption={"Sosyal Medya Linki"}
            />
            <Column dataField="socialMediaName" caption={"Sosyal Medya Adı"} />
            <Column dataField="desc" caption={"Açıklama"} />
          </DataGrid>
          <span className="show">Show:</span>
        </Container>
      </div>
    </>
  );
};

export default SocialMediaDatagrid;
