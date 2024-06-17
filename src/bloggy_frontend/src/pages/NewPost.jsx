import React from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Formik } from 'formik'
import { useToast } from '../hooks/useToast'
import { bloggy_backend } from '../../../declarations/bloggy_backend'
import { useNavigate } from 'react-router-dom'
import {
  postInitialValues,
  postValidationSchema,
} from '../constants/formConstants'

const NewPost = () => {
  const { showToast } = useToast()
  const navigate = useNavigate()

  const addPost = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const { title, description } = values
      const result = await bloggy_backend.createPost(title, description)
      console.log('Result from createPost:', result)
      if (result.hasOwnProperty('ok')) {
        showToast('Post added successfully!', 'success')
        resetForm()
        setTimeout(() => {
          navigate('/posts')
        }, 2000)
      } else if (result.hasOwnProperty('err')) {
        setErrors({ general: result.err })
        showToast(result.err, 'error')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      setErrors({ general: 'An error occurred while creating the post.' })
      showToast('An error occurred while creating the post.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container>
      <h2 className="text-center my-4">Add Post</h2>
      <Row className="justify-content-center my-4">
        <Col md={6}>
          <Formik
            initialValues={postInitialValues}
            validationSchema={postValidationSchema}
            onSubmit={addPost}
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
