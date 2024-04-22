const express = require('express');
const router = express.Router();
const path = require('path');
const { conectarBanco, desconectarBanco } = require('../midleware/database_SQLExpress_middleware');
const { query } = require('../bancodados/database_SQLExpress');
const autenticacaoMiddleware = require('../midleware/authMiddleware');
const { CONFIG_DIRETORIO_SRC } = require('../configuracoes');

router.get('/listar/:id', autenticacaoMiddleware, async (req, res) => {
   
    const idParameter = req.params.id;
    
    try {
        let retornoBancoList 
        
        if (idParameter == 0 ) {
            retornoBancoList = await query(`
            SELECT 
                C.idCurso AS id,
                C.nmCurso AS texto,
                C.idCoordenador,
                P.nmPessoa,
                P.urlFOto
            FROM 
                OCOTB.Curso C
                INNER JOIN OCOTB.Pessoa P ON P.idPessoa = C.idCoordenador`);
        } else {
            retornoBancoList = await query(`
            SELECT 
                C.idCurso AS id,
                C.nmCurso AS texto,
                C.idCoordenador,
                P.nmPessoa,
                P.urlFOto
            FROM 
                OCOTB.Curso C
                INNER JOIN OCOTB.Pessoa P ON P.idPessoa = C.idCoordenador
            WHERE 
                C.idCurso = ${idParameter}`)
        }

        console.log('Resultado da consulta listar:', retornoBancoList);


        res.json(retornoBancoList);

    } catch (error) {
        console.error('Erro ao listar ocorrências:', error);
        res.status(500).json({ message: 'Erro interno do servidor (ocorrenciaRoute)' });
    } 
});


/**
 * Rota para selecionar uma pessoa por ID
 */
router.get('/salvar/:id', autenticacaoMiddleware, async (req, res) => {
    const ocorrenciaId = req.params.id;

    let usuarioLogado = req.session.usuario;

    try {
        let retornoBancoDados = await query(`
            SELECT 
                 OCO.idOcorrencia
                ,OCO.deOcorrencia
                ,OCO.dtOcorrencia
                ,OCO.idLocal	
                ,OCO.idPessoa
                ,OCO.idOcorrenciaSubTipo
                ,OCO.idCurso
                ,OS.deOcorrenciaSituacao
            FROM 
                OCOTB.Ocorrencia OCO
                INNER JOIN OCOTB.Pessoa P ON OCO.idPessoa = OCO.idPessoa
                INNER JOIN OCOTB.OcorrenciaHistoricoSituacao CHS ON CHS.idOcorrencia = OCO.idOcorrencia AND CHS.icAtivo = 1
                INNER JOIN OCOTB.OcorrenciaSituacao OS ON OS.idOcorrenciaSituacao = CHS.idOcorrenciaSituacao
            WHERE 
                P.idPessoa = ${usuarioLogado.idPessoa}`);

        console.log('Resultado da consulta:', retornoBancoDados);


        res.render('pages/ocorrenciaManter', { session: req.session, tituloCabecalho: 'Ocorrências', ocorrenciasMinhas: retornoBancoDados});

    } catch (error) {
        console.error('Erro ao listar ocorrências:', error);
        res.status(500).json({ message: 'Erro interno do servidor (ocorrenciaRoute)' });
    } 
});

module.exports = router;