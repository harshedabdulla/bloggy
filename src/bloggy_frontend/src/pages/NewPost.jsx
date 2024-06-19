import React from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Formik } from 'formik'
import { useToast } from '../hooks/useToast'
import { bloggy_backend } from '../../../declarations/bloggy_backend'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  postInitialValues,
  postValidationSchema,
} from '../constants/formConstants'
import { Principal } from '@dfinity/principal'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const NewPost = () => {
  const { showToast } = useToast()
  const navigate = useNavigate()
  const { artemisAdapter } = useAuth()
  const queryClient = useQueryClient()

  const addPost = async (values) => {
    const { title, description } = values
    if (!artemisAdapter) {
      throw new Error('Artemis wallet is not connected')
    }
    const principalId = artemisAdapter.principalId
    const principal = Principal.fromText(principalId)
    const result = await bloggy_backend.createPost(
      title,
      description,
      principal
    )
    return result
  }

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (result) => {
      if (result.hasOwnProperty('ok')) {
        showToast('Post added successfully!', 'success')
        queryClient.invalidateQueries('posts')
        console.log('Post added ', result)
        navigate('/posts', { replace: true })
      } else if (result.hasOwnProperty('err')) {
        throw new Error(result.err)
      }
    },
    onError: (error) => {
      showToast(
        error.message || 'An error occurred while creating the post.',
        'error'
      )
    },
  })

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
