//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:openapi/src/model/admin_tariffs_get200_response_items_inner.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_tariffs_get200_response.g.dart';

/// AdminTariffsGet200Response
///
/// Properties:
/// * [items] 
@BuiltValue()
abstract class AdminTariffsGet200Response implements Built<AdminTariffsGet200Response, AdminTariffsGet200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<AdminTariffsGet200ResponseItemsInner>? get items;

  AdminTariffsGet200Response._();

  factory AdminTariffsGet200Response([void updates(AdminTariffsGet200ResponseBuilder b)]) = _$AdminTariffsGet200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminTariffsGet200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminTariffsGet200Response> get serializer => _$AdminTariffsGet200ResponseSerializer();
}

class _$AdminTariffsGet200ResponseSerializer implements PrimitiveSerializer<AdminTariffsGet200Response> {
  @override
  final Iterable<Type> types = const [AdminTariffsGet200Response, _$AdminTariffsGet200Response];

  @override
  final String wireName = r'AdminTariffsGet200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminTariffsGet200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(AdminTariffsGet200ResponseItemsInner)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminTariffsGet200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminTariffsGet200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(AdminTariffsGet200ResponseItemsInner)]),
          ) as BuiltList<AdminTariffsGet200ResponseItemsInner>;
          result.items.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminTariffsGet200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminTariffsGet200ResponseBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

