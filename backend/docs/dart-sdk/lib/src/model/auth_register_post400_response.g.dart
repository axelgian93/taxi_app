// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_register_post400_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AuthRegisterPost400Response extends AuthRegisterPost400Response {
  @override
  final String? error;

  factory _$AuthRegisterPost400Response(
          [void Function(AuthRegisterPost400ResponseBuilder)? updates]) =>
      (AuthRegisterPost400ResponseBuilder()..update(updates))._build();

  _$AuthRegisterPost400Response._({this.error}) : super._();
  @override
  AuthRegisterPost400Response rebuild(
          void Function(AuthRegisterPost400ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthRegisterPost400ResponseBuilder toBuilder() =>
      AuthRegisterPost400ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthRegisterPost400Response && error == other.error;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, error.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthRegisterPost400Response')
          ..add('error', error))
        .toString();
  }
}

class AuthRegisterPost400ResponseBuilder
    implements
        Builder<AuthRegisterPost400Response,
            AuthRegisterPost400ResponseBuilder> {
  _$AuthRegisterPost400Response? _$v;

  String? _error;
  String? get error => _$this._error;
  set error(String? error) => _$this._error = error;

  AuthRegisterPost400ResponseBuilder() {
    AuthRegisterPost400Response._defaults(this);
  }

  AuthRegisterPost400ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _error = $v.error;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthRegisterPost400Response other) {
    _$v = other as _$AuthRegisterPost400Response;
  }

  @override
  void update(void Function(AuthRegisterPost400ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthRegisterPost400Response build() => _build();

  _$AuthRegisterPost400Response _build() {
    final _$result = _$v ??
        _$AuthRegisterPost400Response._(
          error: error,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
