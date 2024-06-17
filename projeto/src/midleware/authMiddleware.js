const express = require('express');


/**
 * 
 * @author Antonio Augusto  
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next
 */
function autenticacaoMiddleware(req, res, next) {
    
    if (req.session && req.session.usuario) {
       
        // O usuário está autenticado
        next();
    
    } else {
        
        if (req.originalUrl != null || req.originalUrl != undefined){
            req.session.originalUrl = req.originalUrl;
        }
        
        res.redirect('/api/login/loginInit');
        //res.sendFile('../login.html', { root: path.join(__dirname, 'projeto', 'src') });
    }
}

/*function autorizacaoMiddlewareAdminFuncionario(req, res, next) {
    if (req.session && req.session.usuario && (req.session.usuario.tipo === 'admin' || req.session.usuario.tipo === 'funcionario')) {
        next();
    } else {
        res.status(403).send('Acesso negado.');
    }
}*/

module.exports = autenticacaoMiddleware;