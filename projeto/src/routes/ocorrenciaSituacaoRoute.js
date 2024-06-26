const express = require('express');
const router = express.Router();
const path = require('path');
const { query, querySoredProcedure } = require('../midleware/database_middleware');
const autenticacaoMiddleware = require('../midleware/authMiddleware');


router.get('/listarJson/:id', autenticacaoMiddleware, async (req, res) => {
   
    const idParameter = req.params.id;
    
    try {
        
        let retornoBancoDados = await querySoredProcedure("OCOTB.SP_getOcorrenciaSituacao", {idOcorrenciaSituacao: idParameter});
       
        res.render('pages/situacaoListar', {
            tituloCabecalho: 'Lista Situação', 
            subCabecalho: 'Listar',
            situacaoList: retornoBancoDados}
        );
         // Monta dinamicamente Curso
     selectElementCriarOpionSituacao (
        '/api/ocorrencia/listarJson/0', 
        ddlsituacaoOcorrencia.attr('id'), 
        false, 
        $('#idOcorrenciaSituacao').val()
    );

    } catch (error) {
        console.error('Erro ao listar situações:', error);
        res.status(500).json({ message: 'Erro interno do servidor (ocorrenciaSituacaoRoute)' });
    } 
});


router.post('')