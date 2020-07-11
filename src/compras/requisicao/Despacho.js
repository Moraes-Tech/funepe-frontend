import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Container, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
  despachoModalClose,
  showAlertErrorOpen,
} from '../../redux/features/context/contextSlice';
import {
  inserirHistorico,
  atualizarRequisicao,
  selectAllGrupos,
  selectAllUsuarios,
} from '../../redux/features/compras/comprasSlice';
import { selectAllUsuariosGrupoReq } from '../../redux/features/protocolo/protocoloSlice';
import AlertError from '../../pages/alerts/AlertError';

export default function Despacho() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { despachaRequisicaoModal, showAlertError } = useSelector(
    state => state.contexto
  );
  const { requisicao } = useSelector(state => state.compras);
  const { grupos, usuarios } = useSelector(state => state.protocolo);
  const [selectGrupo, setSelectGrupo] = useState([]);
  const [idUsuario, setIdUsuario] = useState([]);
  const [observacao, setObservacao] = useState(
    'Tomar providências necessárias.'
  );
  const [valueUsuario, setValueUsuario] = useState([]);
  const [usuarioReq, setUsuarioReq] = useState(usuarios);
  const [grupoReq, setGrupoReq] = useState(grupos);
  const [, setValueGrupo] = useState([]);

  const colourStyles = {
    option: provided => ({
      ...provided,
      color: 'blue',
    }),
    placeholder: defaultStyles => {
      return {
        ...defaultStyles,
        color: 'black',
      };
    },
    multiValueLabel: styles => ({
      ...styles,
      color: 'black',
    }),
  };

  useEffect(() => {
    dispatch(selectAllUsuarios()).then(response => {
      if (response.length > 0) {
        const reqs = response.map(req => ({
          ...req,
        }));

        setUsuarioReq(reqs);
      }
    });

    dispatch(selectAllGrupos()).then(response => {
      if (response.length > 0) {
        const reqs = response.map(req => ({
          ...req,
        }));
        setGrupoReq(reqs);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const arrayUsuarios = [];
    const arrayGrupos = [];
    async function loadUsuarios() {
      console.log(usuarioReq.length);
      if (usuarioReq.length > 0) {
        usuarioReq.forEach(usuario => {
          arrayUsuarios.push({
            value: usuario.idusuario,
            label: usuario.username,
          });
        });
      }
      setIdUsuario(arrayUsuarios);
    }
    async function loadGrupos() {
      if (grupoReq.length > 0) {
        grupoReq.forEach(grupo => {
          arrayGrupos.push({
            value: grupo.idgrupo,
            label: grupo.descricaogrupo,
          });
        });
      }
      setSelectGrupo(arrayGrupos);
    }
    loadUsuarios();
    loadGrupos();
  }, []);
  console.log(usuarioReq, grupoReq);

  function onChangeUsuarios(selectedOption) {
    setValueUsuario(selectedOption);
  }

  function onChangeGrupo(selectedOption) {
    setValueGrupo(selectedOption);
    dispatch(selectAllUsuariosGrupoReq(selectedOption.value)).then(response => {
      const arrayUsuarios = [];
      if (response.length > 0) {
        response.forEach(usuario => {
          if (usuario.idgrupo === selectedOption.value)
            arrayUsuarios.push({
              value: usuario.idusuario,
              label: usuario.usuario.username,
            });
        });
      }
      setIdUsuario(arrayUsuarios);
    });
  }

  async function handleDespachar() {
    if (valueUsuario.length > 0) {
      valueUsuario.forEach(usuario => {
        const historico = {
          idrequisicao: requisicao.idrequisicao,
          iddespachante: user.idusuario,
          iddestinatario: usuario.value,
          status: 'Despachado',
          datahistorico: new Date(),
          observacao,
        };
        dispatch(inserirHistorico(historico));

        const reqAtualizada = {
          iddestinatario: usuario.value,
          idrequisicao: requisicao.idrequisicao,
        };
        dispatch(atualizarRequisicao(reqAtualizada));
      });
      toast.success('Requisição despachada com sucesso!');
      dispatch(
        showAlertErrorOpen({
          showAlertError: false,
          alertError: '',
        })
      );
    } else {
      console.log(showAlertError);
      dispatch(
        showAlertErrorOpen({
          showAlertError: true,
          alertError: 'Selecione um usuário!',
        })
      );
    }
  }

  const handleClose = () => dispatch(despachoModalClose());

  return (
    <Container>
      <Form>
        <Modal
          variant="danger"
          dialogClassName="modal-danger"
          size="lg"
          animation
          show={despachaRequisicaoModal}
          onHide={handleClose}
        >
          {showAlertError ? <AlertError /> : null}

          <Modal.Body>
            <Card bg="success" text="light" key={1}>
              <Card.Body>
                <Card.Title>Despachar Requisição</Card.Title>
                <Container>
                  <Form.Row>
                    <Form.Group as={Col} controlId="editPrazo">
                      <Form.Label>Grupos:</Form.Label>
                      <Select
                        isSearchable
                        styles={colourStyles}
                        options={selectGrupo}
                        onChange={selectedOption =>
                          onChangeGrupo(selectedOption)
                        }
                        defaultValue={{ label: 'Compras', value: 21 }}
                        theme={theme => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            neutral50: '#1A1A1A',
                          },
                        })}
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Usuários:</Form.Label>
                      <Select
                        isMulti
                        isSearchable
                        styles={colourStyles}
                        options={idUsuario}
                        onChange={selectedOption =>
                          onChangeUsuarios(selectedOption)
                        }
                        placeholder="Selecione Usuários"
                        theme={theme => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            neutral50: '#1A1A1A',
                          },
                        })}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="editDepacho">
                      <Form.Label>Despacho</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={observacao}
                        onChange={e => setObservacao(e.target.value)}
                      />
                    </Form.Group>
                  </Form.Row>
                </Container>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleDespachar}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </Container>
  );
}