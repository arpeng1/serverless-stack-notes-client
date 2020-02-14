import React, { useRef, useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { Form } from 'react-bootstrap';
import { s3Upload } from '../libs/awsLib';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import './Notes.css';

function Notes(props) {
  const file = useRef(null);
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadNote() {
      return API.get('notes', `/notes/${props.match.params.id}`);
    }
    async function onLoad() {
      try {
        const note = await loadNote();
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentUrl = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        alert(e);
      }
    }
    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, '');
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveNote(note) {
    return API.put('notes', `/notes/${props.match.params.id}`, {
      body: note
    });
  }

  async function handleSubmit(event) {
    let attachment = null;
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`
      );
      return;
    }
    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }
      await saveNote({
        content,
        attachment: attachment || note.attachment
      });
      props.history.push('/');
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function deleteNote() {
    return API.del('notes', `/notes/${props.match.params.id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this?');
    if (!confirmed) return;
    setIsDeleting(true);

    try {
      await deleteNote();
      props.history.push('/');
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  console.log(note);
  return (
    <div className='notes'>
      {note && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='content'>
            <Form.Control 
              value={content}
              as='textarea'
              rows='3'
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>
          {note.attachment && (
            <Form.Group>
              <Form.Label>Attachment</Form.Label>
              <Form.Control 
                as='a'
                plaintext
                readOnly
                target='_blank'
                rel='noopener noreferrer'
                href={note.attachmentUrl}
              >
                {formatFilename(note.attachment)}
              </Form.Control>
            </Form.Group>
          )}
          <Form.Group controlId='file'>
            {!note.attachment && <Form.Label>Attachment</Form.Label>}
            <Form.Control onChange={handleFileChange} type='file' />
          </Form.Group>
          <LoaderButton
            block
            type='submit'
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            variant='danger'
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </Form>
      )}
    </div>
  )
}

export default Notes;