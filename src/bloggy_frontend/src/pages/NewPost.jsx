import React from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Formik } from 'formik'
import {
  postInitialValues,
  postValidationSchema,
} from '../constants/formConstants'
import { useCreatePost } from '../hooks/useCreatePost'

const NewPost = () => {
  const mutation = useCreatePost()

  return (
    <Container>
      <h2 className="text-center my-4">Add Post</h2>
      <Row className="justify-content-center my-4">
        <Col md={6}>
          <Formik
            initialValues={postInitialValues}
            validationSchema={postValidationSchema}
            onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
              mutation.mutate(values, {
                onSettled: () => {
                  setSubmitting(false)
                },
                onSuccess: () => {
                  resetForm()
                },
                onError: (error) => {
                  setErrors({ general: error.message })
                },
              })
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isValid={touched.title && !errors.title}
                    isInvalid={touched.title && !!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={12}
                    value={values.description}
                    onChange={handleChange}
                    isValid={touched.description && !errors.description}
                    isInvalid={touched.description && !!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                {errors.general && (
                  <Alert variant="danger" className="mt-3">
                    {errors.general}
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="mt-3 border-black bg-white text-black"
                  disabled={mutation.isLoading}
                >
                  Add Post
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}

export default NewPost
