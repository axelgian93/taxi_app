// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_diagnostics_matching_get200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminDiagnosticsMatchingGet200Response
    extends AdminDiagnosticsMatchingGet200Response {
  @override
  final bool? postgisAvailable;
  @override
  final AdminDiagnosticsMatchingGet200ResponseEnv? env;
  @override
  final BuiltMap<String, int>? counters;

  factory _$AdminDiagnosticsMatchingGet200Response(
          [void Function(AdminDiagnosticsMatchingGet200ResponseBuilder)?
              updates]) =>
      (AdminDiagnosticsMatchingGet200ResponseBuilder()..update(updates))
          ._build();

  _$AdminDiagnosticsMatchingGet200Response._(
      {this.postgisAvailable, this.env, this.counters})
      : super._();
  @override
  AdminDiagnosticsMatchingGet200Response rebuild(
          void Function(AdminDiagnosticsMatchingGet200ResponseBuilder)
              updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminDiagnosticsMatchingGet200ResponseBuilder toBuilder() =>
      AdminDiagnosticsMatchingGet200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminDiagnosticsMatchingGet200Response &&
        postgisAvailable == other.postgisAvailable &&
        env == other.env &&
        counters == other.counters;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, postgisAvailable.hashCode);
    _$hash = $jc(_$hash, env.hashCode);
    _$hash = $jc(_$hash, counters.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(
            r'AdminDiagnosticsMatchingGet200Response')
          ..add('postgisAvailable', postgisAvailable)
          ..add('env', env)
          ..add('counters', counters))
        .toString();
  }
}

class AdminDiagnosticsMatchingGet200ResponseBuilder
    implements
        Builder<AdminDiagnosticsMatchingGet200Response,
            AdminDiagnosticsMatchingGet200ResponseBuilder> {
  _$AdminDiagnosticsMatchingGet200Response? _$v;

  bool? _postgisAvailable;
  bool? get postgisAvailable => _$this._postgisAvailable;
  set postgisAvailable(bool? postgisAvailable) =>
      _$this._postgisAvailable = postgisAvailable;

  AdminDiagnosticsMatchingGet200ResponseEnvBuilder? _env;
  AdminDiagnosticsMatchingGet200ResponseEnvBuilder get env =>
      _$this._env ??= AdminDiagnosticsMatchingGet200ResponseEnvBuilder();
  set env(AdminDiagnosticsMatchingGet200ResponseEnvBuilder? env) =>
      _$this._env = env;

  MapBuilder<String, int>? _counters;
  MapBuilder<String, int> get counters =>
      _$this._counters ??= MapBuilder<String, int>();
  set counters(MapBuilder<String, int>? counters) =>
      _$this._counters = counters;

  AdminDiagnosticsMatchingGet200ResponseBuilder() {
    AdminDiagnosticsMatchingGet200Response._defaults(this);
  }

  AdminDiagnosticsMatchingGet200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _postgisAvailable = $v.postgisAvailable;
      _env = $v.env?.toBuilder();
      _counters = $v.counters?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminDiagnosticsMatchingGet200Response other) {
    _$v = other as _$AdminDiagnosticsMatchingGet200Response;
  }

  @override
  void update(
      void Function(AdminDiagnosticsMatchingGet200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminDiagnosticsMatchingGet200Response build() => _build();

  _$AdminDiagnosticsMatchingGet200Response _build() {
    _$AdminDiagnosticsMatchingGet200Response _$result;
    try {
      _$result = _$v ??
          _$AdminDiagnosticsMatchingGet200Response._(
            postgisAvailable: postgisAvailable,
            env: _env?.build(),
            counters: _counters?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'env';
        _env?.build();
        _$failedField = 'counters';
        _counters?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'AdminDiagnosticsMatchingGet200Response',
            _$failedField,
            e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
